import TinyReact from "./TinyReact";

const root = document.getElementById("root")

const virtualDOM = (
  <div className="classnamediv">
    <h1>Charon</h1>
    <div>Handsome Boy</div>
    {
      2==1 && (
        <div className="imposible">不可能</div>
      )
    }
    <input value="13" />
    <input type="checkbox" checked />
  </div>
)

const motifyDOM = (
  <div className="classnamediv">
    <h1 onClick={() => { console.log('handsome boy123') }}>Charon</h1>
    <div>Handsome Boy123</div>
    <input type="checkbox" checked={false} />
  </div>
)

// TinyReact.render(virtualDOM, root)

// setTimeout(() => {
//   TinyReact.render(motifyDOM, root)
// }, 2000)

// TinyReact.render(virtualDOM, root) 

function Heart (props) {
  return (
    <div>
      <div className="charon">{`${props.name}'s Heart` }</div>
      <div>{props.age}</div>
    </div>
  )
}

// console.log(Object.entries(<Heart />))

// TinyReact.render(<Heart name="charon" />, root) 

class Alert extends TinyReact.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: "Default Title"
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log("componentWillReceiveProps")
  }

  componentWillUpdate (nextProps) {
    console.log("componentwillUpdate")
  }

  componentDidUpdate (nextProps) {
    console.log("componentDidUpdate")
  }

  componentWillUnmount (nextProps) {
    console.log("componentWillUnmount")
  }

  render () {
    return (
      <div>
        <div>{this.state.title}</div>
        <div onClick={() => { this.setState({
          title: 'Charon'
        }) }}>Hello Charon</div>
        {this.props.name}<br />
        {this.props.age}
      </div>
    )
  }
}

// TinyReact.render(<Alert name="charon" age={26} />, root) 
// TinyReact.render(<Alert name="charon" age={26} />, root)

// setTimeout(() => {
//   TinyReact.render(<Alert name="charon123" age={27} />, root)
// }, 2000)

class DemoRef extends TinyReact.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick () {
    console.log(this)
    console.log(this.input.value)
    console.log(this.alert)
  }

  componentDidMount () {
    console.log('componentDidMount')
  }

  render () {
    return (
      <div>
        <input type="text" ref={input => this.input = input} />
        <button onClick={this.handleClick}>charon</button>
        <Alert ref={alert => this.alert = alert} name="charon" age="12" />
      </div>
    )
  }
}

// TinyReact.render(<DemoRef />, root)


class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          id: 1,
          name: "张三"
        },
        {
          id: 2,
          name: "李四"
        },
        {
          id: 3,
          name: "王五"
        },
        {
          id: 4,
          name: "赵六"
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.persons.push(newState.persons.shift())
    // newState.persons.splice(1, 0, { id: 100, name: "李逵" })
    newState.persons.pop()
    this.setState(newState)
  }
  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map(person => (
            <li key={person.id} a={person.id}>
              {person.name}
              <Alert name="charon" age="12" />
            </li>
          ))}
          
        </ul>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, root)

