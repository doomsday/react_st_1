var ReactDOM = require('react-dom');
var React = require('react');

var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в	четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами'
    },
    {
        author: 'Просто	Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    },
    {
        author: 'Killa',
        text: 'Сейчас бы в борт не пробить'
    }
];

// Article
var Article = React.createClass({

    // Prop Validation
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function() {
        return {
            visible: false
        };
    },

    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({ visible: true });
    },

    render: function() {
        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        return (
            <div className='article'>
                <p className='news__author'>{author}: </p>
                <p className='news__text'>{text}</p>
                <a href="#"
                    onClick={this.readmoreClick}
                    className={'news__readmore ' + (visible ? 'none' : '') }>
                    Details
                </a>
                <p className={'news__big-text ' + (visible ? '' : 'none') }>{bigText}</p>
            </div>
        )
    }
});

// News
var News = React.createClass({
    // Prop Validation
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return {
            counter: 0
        }
    },

    render: function() {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item}/>
                    </div>
                );
            });
        } else {
            newsTemplate = <p>There is no news, unfortunately</p>
        }

        return (
            <div className='news'>
                {newsTemplate}
                <strong
                    className = {'news__count ' + (data.length > 0 ? '' : 'none') }>
                    Всего новостей: {data.length}
                </strong>
            </div>
        );
    }
});

// Test Input
var Add = React.createClass({

    /**
     * Invoked once before the component is mounted. The return value will be
     * used as the initial value of this.state
     */
    getInitialState: function() {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    },

    /**
     * Invoked immediately before mounting occurs
     */
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },

    onCheckRuleClick: function() {
        this.setState({ agreeNotChecked: !this.state.agreeNotChecked });
    },

    onBtnClickHandler: function(e) {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        alert(author + '\n' + text);
    },

    onAuthorChange: function(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({ authorIsEmpty: false })
        } else {
            this.setState({ authorIsEmpty: true })
        }
    },

    onTextChange: function(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({ textIsEmpty: false })
        } else {
            this.setState({ textIsEmpty: true })
        }
    },

    /**
     * Refs and findDOMNode()
     * You can attach a "ref"" to any element, which allows you to reference the
     * backing instance of the component
     */
    render: function() {
        var agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
        return (
            <form className='add cf'>
                <input
                    className='add__author'
                    type="text"
                    defaultValue=''
                    placeholder='Your name'
                    ref='author'
                    onChange={this.onAuthorChange}
                    />
                <textarea
                    className='add__text'
                    defaultValue=''
                    placeholder='News text'
                    ref='text'
                    onChange={this.onTextChange}
                    ></textarea>
                <label className='add__checkrule'>
                    <input
                        type='checkbox'
                        onClick={this.onCheckRuleClick}
                        ref='checkrule'
                        />
                    I agree with the rules
                </label>
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert__button'
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty }
                    >
                    Show alert
                </button>
            </form>
        );
    }
});

// App
var App = React.createClass({
    render: function() {
        return (
            <div className='app'>
                <h3>Breaking news</h3>
                <Add />
                <News data={my_news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);