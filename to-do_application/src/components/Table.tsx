import { Table, TableColumnsType, TablePaginationConfig } from 'antd'

interface IProps {
    dataSource: any[],
    columns: TableColumnsType<any> | undefined,
    pagination: false | TablePaginationConfig | undefined,
}

export default function ToDoTable({ dataSource, columns, pagination }: IProps) {
    return (
        <Table dataSource={dataSource} columns={columns} pagination={pagination} />
    )
}