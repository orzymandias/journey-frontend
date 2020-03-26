import { Button, Card } from '@material-ui/core';
import * as React from 'react';
import { IMCQQuestion } from '../assessment/assessmentShape';


export interface IMCQChooserProps {
  mcq: IMCQQuestion;
  handleMCQSubmit: (choiceId: number) => void;
}

type State = {
  mcqOption: number | null;
};

class MCQComponent extends React.Component<IMCQChooserProps, State> {
  constructor(props: IMCQChooserProps) {
    super(props);
    this.state = {
      mcqOption: props.mcq.answer
    };
  }
  public render() {
    const options = this.props.mcq.choices.map((choice, i) => (
      <Button 
        onClick={this.onButtonClick(i)}
      >
        {choice.content}
      </Button>
    ));
    return (
      <div className="MCQChooser row">
        <Card className="mcq-content-parent col-xs-12 middle-xs">
          <div className="row mcq-options-parent between-xs">{options}</div>
        </Card>
      </div>
    );
  }

  private onButtonClick = (i: number) => (e: any) => {
    if (i !== this.state.mcqOption) {
      this.props.handleMCQSubmit(i);
      this.setState({
        mcqOption: i
      });
    }
  };
}





