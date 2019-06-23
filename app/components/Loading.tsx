import * as React from 'react';

const loadingstyle: React.CSSProperties = {
  alignItems: 'center',
  fontSize: '30px',
  justifyContent: 'center',
  textAlign: 'center'
};

interface Props {
  text?: string;
  speed?: number;
}

interface State {
  currtext: string | undefined;
}

export default class Loading extends React.Component<Props, State> {
  static defaultProps: Props = {
    speed: 300,
    text: 'Loading'
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      currtext: props.text
    };
  }

  componentDidMount(): void {
    const { text, speed } = this.props;
    const { currtext } = this.state;

    const stopper = `${text}........`;
    this.interval = setInterval(() => {
      if (currtext === stopper) {
        this.setState(() => ({ currtext }));
      } else {
        this.setState((prevState: State) => ({ currtext: `${prevState.currtext}.` }));
      }
    }, speed);
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  private interval!: number;

  render(): React.ReactNode {
    const { currtext } = this.state;
    return <div style={loadingstyle}>{currtext}</div>;
  }
}
