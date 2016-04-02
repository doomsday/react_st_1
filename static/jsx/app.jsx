var ReactDOM = require("react-dom");
var React = require("react");

var my_news = [
    {
        author: "Саша Печкин",
        text: "В четчерг, четвертого числа..."
    },
    {
        author: "Просто	Вася",
        text: "Считаю, что $ должен стоить 35 рублей!"
    },
    {
        author: "Гость",
        text: "Бесплатно. Скачать. Лучший сайт - http://localhost:3000"
    },
    {
        // error, no "author" here, shall be validated in Article
        text: "Сейчас бы в борт не пробить"
    }
];

// Article
var Article = React.createClass({
    // Prop Validation
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired
        })
    },
    render: function () {
        var author = this.props.data.author,
        text = this.props.data.text;
        
        return (
            <div className="article">
            <p className="news__author">{author}:</p>
            <p className="news__text">{text}</p>
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
            <div className="news">
                {newsTemplate}
                <strong className = {'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

// App
var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <h3>Breaking news</h3>
                <News data={my_news}/> {/*data property added*/}
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("root"));