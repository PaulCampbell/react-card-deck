/**
 * @jsx React.DOM
 */
var React = require('react')
var Hammer = require('hammerjs')

var SwipeList = React.createClass({
  componentDidMount:     function() {
                           this.hammer = Hammer(this.getDOMNode())
                           this.hammer.on('drag', this.drag);
                           this.hammer.on('release', this.release);
                         },
  componentWillUnmount:  function() {
                           this.hammer.off('swipeleft', this.swipeLeft);
                         },
  nextCard:              function() {
                           var activeCard = this.state.activeCard
                           this.state.cards.splice(0,1)
                           this.setState({ cards: this.state.cards});
                           this.setState({ activeCardTransform: this.getCardPositionStyle(0,0,0)})
                           this.setState({ activeCard: this.state.cards[0] });
                         },
  release:               function(ev) {
                           if(Math.abs(ev.gesture.deltaX) > 300/3) {
                             this.nextCard();
                           } else {
                             this.setState({ activeCardTransform: this.getCardPositionStyle(0,0,0)})
                           }
                         },
  drag:                  function(ev) {
                           var dragX_offset = ev.gesture.deltaX
                           var dragY_offset = ev.gesture.deltaY
                           this.setState({activeCardTransform: this.getCardPositionStyle(dragX_offset, dragY_offset,8)})
                         },
  getInitialState:       function() {
                           firstcard = { background: 'red', name: 1 }
                           return {
                             cards: [firstcard, {background: 'green', name: 2}, {background: 'blue', name: 3}],
                             activeCard: firstcard,
                             activeCardTransform: this.getCardPositionStyle(0,0,0)
                           };
                         },
  getCardPositionStyle:  function(xPos, yPos, rotation) {
                           return 'translate3d(' + xPos.toString() +'px,' + yPos.toString() + 'px, 0) scale3d(1,1,1) rotate(' + rotation + 'deg)'
                         },
  render: function() {
            return (
                <div>
                <ul className="card">
                {this.state.cards.map(function(card, i) {
                  return <li key={i} className={card==this.state.activeCard ? "active" : ""} style={card==this.state.activeCard ? {"-webkit-transform": this.state.activeCardTransform} : {"-webkit-transform": this.getCardPositionStyle(0,0,0)}}>
                <h2 style={{color: card.background}}>{card.name}</h2>
              </li>
                }.bind(this))}
                </ul>
                </div>
            );
          }
});

React.renderComponent(
    <SwipeList />,
    document.getElementById('container')
    );

