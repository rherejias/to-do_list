import { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd'
import Table from "./components/Table";
import { FormModal, ConfirmModal } from "./components/Modal";
import API from './helper/API'

import './App.css'

interface DataSource {
  key: number,
  todo: string,
}

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource, setDataSource] = useState<DataSource[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<DataSource>({
    key: 0,
    todo: '',
  });

  //fetch tasks list
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await API.get("/tasks");
      setDataSource(data.tasks);
      console.log(data);
    }

    fetchData().catch(console.error);
  }, [])

  //update task
  const handleUpdate = async (value: DataSource) => {
    const { data } = await API.put(`/tasks/${value.key}`, value)
    setDataSource(data.tasks)
    setIsModalOpen(false);
  }

  //create task
  const handleAdd = async (value: DataSource) => {
    try {
      value.key = Date.now();
      const { data } = await API.post('/tasks/create', value)
      setDataSource(data.tasks)
      setIsModalOpen(false);
    } catch (error: any) {
      console.log(error.response.data.message)
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    }
  }

  //delete task
  const handleDelete = async (value: DataSource) => {
    const { data } = await API.delete(`/tasks/${value.key}`);
    setDataSource(data.tasks)
  }

  //open add/edit form modal
  const handleModalOpen = (row: DataSource, actionType: string) => {
    setIsModalOpen(true);
    setSelectedRow(row);
    setActionType(actionType)
  }

  const columns = [
    {
      title: 'To-do',
      dataIndex: 'todo',
      key: 'todo',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: DataSource) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleModalOpen(record, 'Update')}>
            Update
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => ConfirmModal({ action: 'Delete', handleOk: () => handleDelete(record) })}>
            Delete
          </Button>
        </Space>
      )
    },
  ];

  return (
    <div className="App">
      {contextHolder}
      <FormModal
        isModalOpen={isModalOpen}
        handleOk={(value) => actionType === 'Update' ? handleUpdate(value) : handleAdd(value)}
        handleCancel={() => setIsModalOpen(false)}
        task={selectedRow}
        actionType={actionType}
      />
      <Button
        className='mb-2'
        type='primary'
        onClick={() => handleModalOpen({ key: 0, todo: '' }, 'Add')}>
        Add Task
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  )
}

export default App
