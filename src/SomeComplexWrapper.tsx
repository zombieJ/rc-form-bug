import * as React from "react";
import { Input, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { InputProps } from "antd/lib/input";

const { Item: FormItem } = Form;

export default class ComplexWrapper extends React.Component<
  FormComponentProps & { formKey: string }
> {
  shouldComponentUpdate() {
    // 实际项目中是在这里对form的key和其他props进行了一次shallowEqual
    // 这里简单重现
    // const { form, ...rest } = this.props;
    // return !shallowEqual(this.props.form) || ! shallowEqual(rest);
    return false;
  }
  handleChange: InputProps["onChange"] = e => {
    const { form, formKey } = this.props;
    // 手动设值以及更新组件
    form.setFieldsValue({
      [formKey]: e.target.value,
    });
    this.forceUpdate();
  };
  render() {
    const { form, formKey } = this.props;
    return (
      <FormItem
        label={formKey}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: "200px",
        }}
      >
        {form.getFieldDecorator(formKey)(
          <Input onChange={this.handleChange} />,
        )}
      </FormItem>
    );
  }
}
