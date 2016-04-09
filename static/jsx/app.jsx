var ReactDOM = require('react-dom');
var React = require('react');
var EventEmitter = require('wolfy87-eventemitter');
window.ee = new EventEmitter();

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
        text: 'Сейчас бы в борт не пробить',
        bigText: 'Everything is fine, just shut up'
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

    readmoreClick: function(event) {
        event.preventDefault();
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
            /**
             * The map() method creates a new array with the results of calling
             * a provided function on every element in this array
             */
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

    onBtnClickHandler: function(event) {
        event.preventDefault();
        var textEl = ReactDOM.findDOMNode(this.refs.text);
        
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        
        var item = [{
            author: author,
            text: text,
            bigText: '...'
        }];
        
        window.ee.emit('News.add', item);
        
        textEl.value = '';
        this.setState({textIsEmpty: true});
    },

    onFieldChange: function(fieldName, event) {
        if (event.target.value.trim().length > 0) {
            this.setState({ ['' + fieldName]: false })
        } else {
            this.setState({ ['' + fieldName]: true })
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
                    onChange={this.onFieldChange.bind(this, 'authorIsEmpty') }
                    />
                <textarea
                    className='add__text'
                    defaultValue=''
                    placeholder='News text'
                    ref='text'
                    onChange={this.onFieldChange.bind(this, 'textIsEmpty') }
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
                    Add news
                </button>
            </form>
        );
    }
});

// App
var App = React.createClass({
    getInitialState: function() {
        return {
            news: my_news
        };
    },
    
    /**
     * Invoked once, only on the client (not on the server), immediately after
     * the initial rendering occurs. At this point in the lifecycle, you can 
     * access any refs to your children
     */
    componentDidMount: function() {
        var self = this;
        window.ee.addListener('News.add', function(item) {
            var nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    },
    
    /**
     * Invoked immediately before a component is unmounted from the DOM
     */
    componentWillUnmount: function() {
        window.ee.removeListener('News.add');
    },
    
    render: function() {
        return (
            <div className='app'>
                <h3>Breaking news</h3>
                <Add />
                <News data={this.state.news}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);