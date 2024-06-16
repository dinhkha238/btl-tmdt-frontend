import { Col, DatePicker, DatePickerProps, Row } from "antd";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ComposedChart,
  Pie,
  PieChart,
} from "recharts";
import {
  useMonthRevenue,
  useStatisticProductItems,
  useUserSpendInfo,
} from "../product.loader";

export const Statistic = () => {
  const [isTimeYM, setIsTimeYM] = useState("");
  const [isTimeYM2, setIsTimeYM2] = useState("");
  const [isTimeY, setIsTimeY] = useState("");
  const { data: dataStatistic } = useStatisticProductItems({
    yy_mm: isTimeYM,
  });
  const { data: dataUserSpendInfo } = useUserSpendInfo({
    yy_mm: isTimeYM2,
  });
  const { data: dataMonthRevenue } = useMonthRevenue({ year: isTimeY });

  const onChangeYM: DatePickerProps["onChange"] = (_, dateString) => {
    setIsTimeYM(dateString);
  };
  const onChangeYM2: DatePickerProps["onChange"] = (_, dateString) => {
    setIsTimeYM2(dateString);
  };
  const onChangeY: DatePickerProps["onChange"] = (_, dateString) => {
    setIsTimeY(dateString);
  };
  return (
    <div>
      <Row justify={"space-between"}>
        <Col>
          <h2>Statistics</h2>
        </Col>
      </Row>
      <Row>
        <Col span={12} style={{ fontSize: 18, marginBottom: 30 }}>
          Thống kê doanh thu và số lượng sản phẩm bán ra theo tháng
        </Col>
        <Col span={12} pull={1}>
          <Row justify={"end"}>
            <DatePicker onChange={onChangeYM} picker="month" />
          </Row>
        </Col>
      </Row>
      <ComposedChart
        width={1000}
        height={500}
        data={dataStatistic?.map((item: any) => {
          return {
            name: item.nameProductItem,
            uv: item.totalQuantity,
            pv: parseFloat(item.totalRevenue.toFixed(2)),
          };
        })}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickFormatter={(name) => {
            // Truncate the name if it is too long
            return name.length > 10 ? `${name.substring(0, 10)}...` : name;
          }}
        />
        <YAxis yAxisId="left" orientation="left" />
        <YAxis yAxisId="right" orientation="right" domain={[0, "dataMax"]} />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="uv" fill="#82ca9d" name="Số lượng" />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="pv"
          stroke="#ff7300"
          name="Doanh thu"
        />
      </ComposedChart>

      <Row justify={"space-between"} style={{ marginTop: 30 }}>
        <Col span={12} style={{ fontSize: 18, marginBottom: 30 }}>
          Thống kê doanh thu theo năm
        </Col>
        <Col span={12} pull={1}>
          <Row justify={"end"}>
            <DatePicker onChange={onChangeY} picker="year" />
          </Row>
        </Col>
      </Row>
      <BarChart
        width={1000}
        height={500}
        data={dataMonthRevenue?.map((item: any, index: any) => {
          return {
            name: `Tháng ${index + 1}`,
            pv: item != null ? parseFloat(item.toFixed(2)) : 0,
          };
        })}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" name={"Doanh thu"} />
      </BarChart>

      <Row justify={"space-between"} style={{ marginTop: 30 }}>
        <Col span={12} style={{ fontSize: 18, marginBottom: 30 }}>
          Thống kê tổng chi tiêu của người dùng theo tháng
        </Col>
        <Col span={12} pull={1}>
          <Row justify={"end"}>
            <DatePicker onChange={onChangeYM2} picker="month" />
          </Row>
        </Col>
      </Row>
      <PieChart width={500} height={500}>
        <Pie
          // chỉnh size của pie chart to hơn
          innerRadius={0}
          outerRadius={150}
          dataKey="value"
          isAnimationActive={false}
          data={dataUserSpendInfo?.map((item: any) => {
            return {
              name: item.nameUser,
              value: item.spendMoney,
            };
          })}
          cx="40%"
          cy="40%"
          fill="#82ca9d"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};
