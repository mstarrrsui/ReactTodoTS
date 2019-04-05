import * as React from 'react';

const loadingstyle: React.CSSProperties = {
    alignItems: 'center',
    fontSize: '30px',
    justifyContent: 'center',
    textAlign: 'center',
};

interface ILoadingProps {
    text?: string;
    speed?: number;
}

interface ILoadingState {
    text: string | undefined;
}

export default class Loading extends React.Component<ILoadingProps, ILoadingState> {
    static defaultProps: ILoadingProps = {
        speed: 300,
        text: 'Loading',
    };

    private interval!: number;

    constructor(props: ILoadingProps) {
        super(props);

        this.state = {
            text: props.text,
        };
    }

    componentDidMount() {
        const { text, speed } = this.props;

        const stopper = `${text}........`;
        this.interval = setInterval(() => {
            if (this.state.text === stopper) {
                this.setState(() => ({ text }));
            } else {
                this.setState((prevState: ILoadingState) => ({ text: `${prevState.text}.` }));
            }
        }, speed);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <div style={loadingstyle}>{this.state.text}</div>;
    }
}
