import * as React from "react";


var styles = {
    content: {
        textAlign: 'center',
        fontSize: '30px',
        justifyContent: 'center',
        alignItems: 'center'
    } as React.CSSProperties
}

interface ILoadingProps {
    text?: string,    
    speed?: number 
}

interface ILoadingState {
    text: string;
}



export default class Loading extends React.Component<ILoadingProps,ILoadingState> {
    static defaultProps: ILoadingProps = {
        text: 'Loading',
        speed: 300
    }

    private interval: number;

    constructor(props: ILoadingProps) {
        super(props)

        this.state = {
            text: props.text
        };
    }

    componentDidMount() {

        const { text, speed } = this.props;

        var stopper = text + '........';
        this.interval = window.setInterval(function () {
            if (this.state.text === stopper) {
                this.setState(function () {
                    return {
                        text:text
                    }
                })
            } else {
                this.setState(function (prevState: ILoadingState) {
                    return {
                        text: prevState.text + '.'
                    }
                })
            }
        }.bind(this), speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <div style={styles.content}>
                {this.state.text}
            </div>
        )
    }
}



// Loading.defaultProps = {
//     text: 'Loading',
//     speed: 300
// }
