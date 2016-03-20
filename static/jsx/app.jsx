var ReactDOM = require('react-dom');
var React = require('react');

var Comments = React.createClass({
    render: function() {
        return (
            <div className="comments">
                There is no comments unfortunately
            </div>
        );
    }
});

var News = React.createClass({
    render: function() {
        return (
            <div className="news">
                There is no news unfortunately
                <Comments />
            </div>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                Hello, I am App component!I can display some news.
                <News />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root'));