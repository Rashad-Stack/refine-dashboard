import { totalCountVariants } from "@/constants";
import { Area, AreaConfig } from "@ant-design/plots";
import { Card, Skeleton } from "antd";
import { Text } from "../text";

type Props = {
  resource: "companies" | "contacts" | "deals";
  isLoading: boolean;
  totalCount: number;
};

export default function DashboardTotalCountCard({
  resource,
  isLoading,
  totalCount,
}: Props) {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];

  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: "index",
    yField: "value",
    appendPadding: [1, 0, 0, 0],
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    animation: false,
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          stroke: "transparent",
        },
      },
      grid: {
        line: { style: { stroke: "transparent" } },
      },
    },
    smooth: true,
    line: {
      color: primaryColor,
    },
    areaStyle: () => ({
      fill: `l(270) 0:2${secondaryColor} 1:${primaryColor}`,
    }),
  };

  return (
    <Card
      style={{
        height: "96px",
        padding: 0,
      }}
      bodyStyle={{
        padding: "8px 8px 8px 12px",
      }}
      size="small">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}>
        {icon}

        <Text
          size="md"
          className="secondary"
          strong
          style={{ marginLeft: "8px" }}>
          {title}
        </Text>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text
          size="xxxl"
          strong
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
          }}>
          {isLoading ? (
            <Skeleton.Button
              active
              size="small"
              shape="round"
              style={{ width: "100px" }}
            />
          ) : (
            totalCount
          )}
        </Text>
        <Area {...config} style={{ width: "50%" }} />
      </div>
    </Card>
  );
}