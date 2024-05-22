import { ScrollToTop } from "@/app/components/scroll";
import {
  useFeedbackByIdProduct,
  useProductItemById,
} from "@/pages/admin-page/product.loader";
import { useAddToCart, useProducts } from "@/pages/app.loader";
import {
  EyeOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Image,
  Menu,
  MenuProps,
  Empty,
  Input,
  Select,
  Popover,
  Modal,
  Button,
  Rate,
} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
const { Option } = Select;
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  getItem("All", "0"),
  getItem("Bathroom", "1"),
  getItem("Bedroom", "2"),
  getItem("Livingroom", "3"),
  getItem("Kitchen", "4"),
];
export const ListSanPham = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const [searchParams, setSearchParams] = useSearchParams();

  let titleSelect = searchParams.get("option") ?? "All";
  let titleFilter = searchParams.get("filter") ?? "";
  let titleSort = searchParams.get("sort") ?? "";
  const { data: dataProducts } = useProducts({
    option: titleSelect,
    filter: titleFilter,
    sort: titleSort,
  });
  const [valueSelect, setValueSelect] = useState("Default sorting");
  const [showInforProduct, setShowInforProduct] = useState(false);
  const [idProduct, setIdProduct] = useState(1);

  const { mutate } = useAddToCart();
  const { data: dataProduct } = useProductItemById({ id: idProduct });
  const { data: dataFeedback } = useFeedbackByIdProduct({ id: idProduct });

  const params = new URLSearchParams(window.location.search);
  const optionValue = params.get("option");
  const location = items.findIndex((item: any) => item?.label === optionValue);
  const content = <span>Add to card</span>;

  return (
    <>
      <div className="products">
        <ScrollToTop />
        <Row>
          <Col span={4}>
            <div className="side-bar">
              <div className="button-option" onClick={toggleCollapsed}>
                <Row className="options">
                  <Col>
                    <MenuUnfoldOutlined
                      style={{ paddingTop: 8, marginLeft: 10 }}
                    />
                  </Col>
                  <Col>
                    <h4 style={{ marginTop: 5, paddingLeft: 10 }}>OPTIONS</h4>
                  </Col>
                </Row>
              </div>
              <Menu
                defaultSelectedKeys={location === -1 ? ["0"] : [`${location}`]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme="light"
                items={items}
                onClick={handleSelect}
              />
            </div>
          </Col>

          <Col span={20}>
            <div className="product-products">
              <Row>
                <Col push={2} span={4}>
                  <Input placeholder="Tìm kiếm" onChange={handleSearch} />
                </Col>
                <Col push={14}>
                  <Select
                    defaultValue="option1"
                    style={{ width: 150 }}
                    onChange={handleChange}
                    value={valueSelect}
                  >
                    <Option value="option1">Default sorting</Option>
                    <Option value="option2">Sort by name</Option>
                    <Option value="option3">Sort by price: low to high</Option>
                    <Option value="option4">Sort by price: high to low</Option>
                  </Select>
                </Col>
              </Row>
              <Row
                justify={"center"}
                style={{ paddingLeft: 100, paddingTop: 50, paddingRight: 100 }}
                gutter={16}
              >
                {dataProducts?.length > 0 ? (
                  dataProducts?.map((item: any) => {
                    return (
                      <Col span={8} offset={0} className="name-product-home">
                        <Row justify={"center"}>
                          <Image
                            preview={false}
                            src={item.url}
                            width={200}
                            style={{ height: 200 }}
                          />
                          <Popover content={content} placement="left">
                            <ShoppingCartOutlined
                              className="icon-add-cart"
                              onClick={handleAddToCart}
                            />
                          </Popover>
                          <Popover content={"Product detail"} placement="left">
                            <EyeOutlined
                              className="icon-detail"
                              onClick={handleProductDetail}
                            />
                          </Popover>
                        </Row>
                        <div className="infor-product">
                          <Row justify="center">{item.name}</Row>
                          <Row justify="center" className="color-borrow font">
                            {item.summary}
                          </Row>
                          <Row justify="center">${item.price}</Row>
                        </div>
                      </Col>
                    );
                    function handleAddToCart() {
                      addToCart(item.productId);
                    }
                    function handleProductDetail() {
                      productDetail(item.productId);
                    }
                  })
                ) : (
                  <Empty
                    description={
                      "No products were found matching your selection."
                    }
                  />
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      {showInforProduct && (
        <Modal
          title={"Product information"}
          visible={showInforProduct}
          onCancel={() => setShowInforProduct(false)}
          footer={false}
          width={700}
        >
          <Row>
            <Col span={12}>
              <Image
                preview={false}
                src={dataProduct?.url}
                width={300}
                style={{ height: 300 }}
              />
            </Col>
            <Col span={12}>
              <Row style={{ fontSize: 24 }}>
                {dataProduct?.name + " - " + dataProduct?.summary}
              </Row>
              <Row style={{ fontSize: 30, color: "orange" }}>
                ${dataProduct?.price}
              </Row>
              <Row justify={"center"}>
                <Col>
                  <Button
                    onClick={() => addToCart(idProduct)}
                    style={{
                      marginTop: 160,
                      width: 320,
                      fontSize: 20,
                      height: 50,
                    }}
                  >
                    Add to cart
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            style={{
              borderTop: "1px solid #ccc",
              marginTop: 40,
              marginBottom: 20,
              paddingTop: 20,
            }}
          >
            <Col
              span={12}
              style={{
                fontSize: 20,
              }}
            >
              PRODUCT REVIEWS
            </Col>
          </Row>
          <Row>
            <Col>
              {dataFeedback?.map((item: any) => {
                return (
                  <div
                    style={{
                      borderBottom: "1px solid #ccc",
                      marginBottom: 20,
                      paddingBottom: 20,
                    }}
                  >
                    <Row>{item?.customer}</Row>
                    <Row>
                      <Rate allowHalf defaultValue={item?.rating} disabled />
                    </Row>
                    <Row>{item?.createdAt}</Row>
                    <Row>{item?.description}</Row>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Modal>
      )}
    </>
  );
  function handleSelect(e: any) {
    let x = e.item.props.children[0][1].props.children;
    searchParams.set("option", x);
    setSearchParams(searchParams);
  }
  function handleSearch(e: any) {
    let x = e.target.value;
    searchParams.set("filter", x);
    setSearchParams(searchParams);
  }
  function handleChange(value: any) {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
    if (value === "option1") {
      setValueSelect("Default sorting");
    }
    if (value === "option2") {
      setValueSelect("Sort by name");
    }
    if (value === "option3") {
      setValueSelect("Sort by price: low to high");
    }
    if (value === "option4") {
      setValueSelect("Sort by price: high to low");
    }
  }
  function addToCart(value: any) {
    mutate(value);
  }
  function productDetail(value: any) {
    setIdProduct(value);
    setShowInforProduct(true);
  }
};
