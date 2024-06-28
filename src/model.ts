export const F = ["FK001","FK002","FK003","FK004","FK005","FK006","FK007","FK008","FK009","FK010"] as const
export const R = [{
  key:"且",
  value:"AND"
},{
  key:"或",
  value:"OR"
}]
export const O = [
  {
  key:"等于",
  value:"="
},
{
  key:"大于",
  value:">"
},
{
  key:"大于等于",
  value:">="
},
{
  key:"小于",
  value:"<"
},
{
  key:"小于等于",
  value:"<="
},
{
  key:"不等于",
  value:"<>"
},
{
  key:"在",
  value:"in"
},
{
  key:"不在",
  value:"notin"
},
{
  key:"范围",
  value:"BETWEEN"
},
]

export interface DataType {
    RN: string; // 规则名称
    C: C2; // 规则内容数组
  }
  
  interface C2 {
    GR: string; // 一级分组逻辑，值：AND OR ，无多个分组时（不分组）为空值""，
    GC: GC[];
  }
  
  interface GC {
    R: string;  //条件组内多个条件的逻辑:AND OR
    C: C[]; //条件数组
  }
  
  interface C {
    F: string; // 比较的字段
    O: string; // 比较操作符=,>,>=,<,<=,<>,in,notin,BETWEEN
    // VT: string | number |boolean; // 值类型
    V: string; // 比较的值
  }