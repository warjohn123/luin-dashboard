export const config = [
  {
    title: "Log",
    dataIndex: "data",
    key: "data",
    sorter: (a: any, b: any) => a.data.length - b.data.length,
    ellipsis: true,
  },
  {
    title: "Timestamp",
    dataIndex: "dateCreated",
    key: "dateCreated",
    sorter: (a: any, b: any) => a.dateCreated - b.dateCreated,
    ellipsis: true,
  },
];
