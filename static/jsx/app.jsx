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
        author: "Килла",
        text: "Сейчас бы в борт не пробить"
    }
];

var News = React.createClass({
    render: function() {
        var data = this.props.data;
        var newsTemplate;
        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <p className="news_author">{item.author}: </p>
                        <p className="news_text">{item.text}</p>
                    </div>
                );
            });
        } else {
            newsTemplate = <p>There is no news, unfortunately</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className = { data.length > 0 ? '' : 'none' }>
                    News total: {data.length}
                </strong>
            </div>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                Hello, I am App component!I can display some news!.
                <News data={my_news}/> {/*data property added*/}
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById("root"));