export const config = [
  {
    title: "Custom Variable Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Data Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    render: (text: any) => {
      if (typeof text == "object") {
        return JSON.stringify(text);
      }

      return text;
    },
  },
];
