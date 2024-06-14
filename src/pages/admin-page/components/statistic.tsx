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
} from "recharts";
import { useMonthRevenue, useStatisticProductItems } from "../product.loader";

export const Statistic = () => {
  const [isTimeYM, setIsTimeYM] = useState("");
  const [isTimeY, setIsTimeY] = useState("");
  const { data: dataStatistic } = useStatisticProductItems({
    yy_mm: isTimeYM,
  });
  const { data: dataMonthRevenue } = useMonthRevenue({ year: isTimeY });

  const onChangeYM: DatePickerProps["onChange"] = (_, dateString) => {
    setIsTimeYM(dateString);
  };
  const onChangeY: DatePickerProps["onChange"] = (_, dateString) => {
    setIsTimeY(dateString);
  };
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];
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
    </div>
  );
};
