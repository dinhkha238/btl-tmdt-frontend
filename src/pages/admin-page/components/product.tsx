import {
  useAddProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "@/pages/app.loader";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  InputRef,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useRef, useState } from "react";
import { useProductItems } from "../product.loader";
import { ColumnType } from "antd/es/table";

interface DataType {
  productId: string;
  name: string;
  summary: string;
  provider: string;
  model: string;
  version: string;
  series: string;
  brand: string;
  price: number;
  inStock: number;
  active: string;
}

export const Product = () => {
  const { data: dataProducts } = useProductItems({
    option: "All",
  });
  const { mutate: mutateAddProduct } = useAddProduct();
  const { mutate: mutateUpdateProduct } = useUpdateProduct();
  const { mutate: mutateDeleteProduct } = useDeleteProduct();
  const [optionModal, setOptionModal] = useState("");
  const [idSelected, setIdSelected] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSelected, setUserSelected] = useState();
  const handleOkDelete = () => {
    mutateDeleteProduct(idSelected);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (
    dataIndex: keyof DataType
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex as string)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex as string)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters as () => void)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? <span>{text.toString()}</span> : text,
  });
  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      width: 300,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 300,
      ...getColumnSearchProps("name"),
    },
    {
      title: "RoomType",
      dataIndex: "summary",
      width: 300,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      width: 300,
    },
    {
      title: "Model",
      dataIndex: "model",
      width: 300,
    },
    {
      title: "Version",
      dataIndex: "version",
      width: 300,
    },
    {
      title: "Series",
      dataIndex: "series",
      width: 300,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      width: 300,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 500,
    },
    {
      title: "Inventory",
      dataIndex: "inStock",
      width: 300,
    },
    {
      title: "Active",
      dataIndex: "active",
      width: 300,
      render: (_: any, data: any) => {
        return (
          <div>
            <EditOutlined
              style={{ paddingRight: 8, color: "blue" }}
              onClick={handleEdit}
            />
            <DeleteOutlined style={{ color: "red" }} onClick={handleDelete} />
          </div>
        );
        function handleEdit() {
          setOptionModal("Edit");
          setVisible(true);
          setIdSelected(data.id);
          form.setFieldsValue(data);
        }
        function handleDelete() {
          setIdSelected(data.id);
          setIsModalOpen(true);
          setUserSelected(data.name);
        }
      },
    },
  ];
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOptionModal("Add");
    setVisible(true);
  };

  const handleOk = () => {
    // Xử lý khi người dùng ấn OK
    if (optionModal === "Add") {
      form
        .validateFields()
        .then((values) => {
          values.id = "123";
          console.log(values);
          mutateAddProduct(values);
          form.resetFields();
          setVisible(false);
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    } else {
      console.log(form.getFieldsValue());
      form
        .validateFields()
        .then((values) => {
          var a = { ...values, id: idSelected };
          mutateUpdateProduct(a);
          form.resetFields();
          setVisible(false);
        })
        .catch((errorInfo) => {
          console.log("Validation failed:", errorInfo);
        });
    }
  };

  const handleCancel = () => {
    // Xử lý khi người dùng ấn Hủy
    form.resetFields();
    setVisible(false);
  };
  const { Option } = Select;
  return (
    <div>
      <Row justify={"space-between"}>
        <Col>
          <h2>Product</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={showModal} style={{ margin: 20 }}>
            Thêm sản phẩm
          </Button>
        </Col>
      </Row>
      <Table dataSource={dataProducts} columns={columns} />;
      <Modal
        title={optionModal === "Add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Room Type"
            name="summary"
            rules={[{ required: true, message: "Vui lòng nhập room type!" }]}
          >
            <Select placeholder="Chọn sản phẩm">
              <Option value="Bathroom">Bathroom</Option>
              <Option value="Bedroom">Bedroom</Option>
              <Option value="Living Room">Living Room</Option>
              <Option value="Kitchen">Kitchen</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Provider"
            name="provider"
            rules={[{ required: true, message: "Vui lòng nhập provider!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: "Vui lòng nhập model!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Version"
            name="version"
            rules={[{ required: true, message: "Vui lòng nhập version!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Series"
            name="series"
            rules={[{ required: true, message: "Vui lòng nhập series!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Vui lòng nhập brand!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập price!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Inventory"
            name="inStock"
            rules={[{ required: true, message: "Vui lòng nhập inventory!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Url Image"
            name="url"
            rules={[{ required: true, message: "Vui lòng nhập url image!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xóa sản phẩm"
        open={isModalOpen}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
      >
        <Alert
          message={
            <p>
              Bạn có chắc chắn muốn xóa sản phẩm "<b>{userSelected}</b>" không?
            </p>
          }
          type="error"
          showIcon
        />
      </Modal>
    </div>
  );
};
