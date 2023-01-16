import { useEffect, useState } from 'react';
import { Modal, Input, Form } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


interface DataSource {
    key: number,
    todo: string,
}

interface IProps {
    isModalOpen: boolean,
    handleOk: (value: DataSource) => void,
    handleCancel: () => void,
    task: DataSource
    actionType: string
}

export const FormModal = ({ isModalOpen, handleOk, handleCancel, task, actionType }: IProps) => {
    const [inputValue, setInputValue] = useState<DataSource>(task);
    const [form] = Form.useForm();

    useEffect(() => {
        setInputValue(task);
    }, [task])

    useEffect(() => {
        form.setFieldsValue({
            task: inputValue.todo
        });
    }, [inputValue])

    return (
        <Modal forceRender title={`${actionType} Task`} open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={() => {
                    form.validateFields(['task']).then(() => handleOk(inputValue))
                }}
                autoComplete="off"
            >
                <Form.Item name="task" rules={[{ required: true, message: 'Please input task' }]}>
                    <Input placeholder="Task..." onChange={(e) => setInputValue({ ...inputValue, todo: e.target.value })} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export const ConfirmModal = ({ action, handleOk }: { action: string, handleOk: () => void }) => {
    Modal.confirm({
        title: 'Confirm',
        icon: <ExclamationCircleOutlined />,
        content: `Are you sure you want to ${action} this task?`,
        okText: action,
        cancelText: 'Cancel',
        onOk: () => handleOk()
    });
};