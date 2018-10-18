import * as React from "react";
import { Form, Button } from "antd";
import { FormComponentProps } from "antd/lib/form";
import ComplexWrapper from "SomeComplexWrapper";

export interface State {
  keys: string[];
}

class App extends React.PureComponent<FormComponentProps, State> {
  state: State = {
    keys: ["a", "b", "c", "d"],
  };
  deleteD = () => {
    this.setState({
      keys: this.state.keys.slice(0, 3),
    });
  };
  render() {
    const { form } = this.props;
    return (
      <>
        {this.state.keys.map(key => (
          <ComplexWrapper key={key} formKey={key} form={form} />
        ))}
        <Button onClick={() => console.log(this.props.form.getFieldsValue())}>
          显示fields
        </Button>
        <Button onClick={this.deleteD}>删除d</Button>
      </>
    );
  }
}

export default Form.create()(App);
