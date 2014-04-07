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
                           this.hammer.off('drag', this.drag);
                           this.hammer.off('release', this.release);
                         },
  nextCard:              function() {
                           var activeCard = this.state.activeCard
                           this.state.cards.splice(0,1)
                           if(this.state.cards.length < 3) {
                             this.addMoreCardsToDeck();
                           }
                           this.setState({ cards: this.state.cards});
                           this.setState({ activeCardTransform: this.getCardPositionStyle(0,0,0)})
                           this.setState({ activeCard: this.state.cards[0] });
                         },
  addMoreCardsToDeck:    function() {
                           this.state.cards.push({name:"someOtherCard", background:'blue'})
                           this.state.cards.push({name:"Card, yeah?", background:'pink'})
                           this.state.cards.push({name:"another card.", background:'yellow'})
                           this.state.cards.push({name:"THISISACARD!", background:'green'})
                         },
  release:               function(ev) {
                           this.setState({keepDisplay: "hide" })
                           this.setState({discardDisplay: "hide" })
                           if(Math.abs(ev.gesture.deltaX) > 300/3) {
                             this.nextCard();
                           } else {
                             this.setState({ activeCardTransform: this.getCardPositionStyle(0,0,0)})
                           }
                         },
  drag:                  function(ev) {
                           var dragX_offset = ev.gesture.deltaX
                           var dragY_offset = ev.gesture.deltaY
                           var rotation = 4;
                           if(dragX_offset < 0) rotation = -4;
                           if(dragX_offset < -70) {
                             this.setState({discardDisplay: "show" })
                           } else {
                             this.setState({discardDisplay: "hide" })
                           }
                           if(dragX_offset > 70) {
                             this.setState({keepDisplay: "show" })
                           } else {
                             this.setState({keepDisplay: "hide" })
                           }
                           this.setState({activeCardTransform: this.getCardPositionStyle(dragX_offset, dragY_offset,rotation, 1.03)})
                         },
  getInitialState:       function() {
                           firstcard = { background: 'red', name: 1 }
                           return {
                             cards: [firstcard, {background: 'green', name: 2}, {background: 'blue', name: 3}],
                             activeCard: firstcard,
                             activeCardTransform: this.getCardPositionStyle(0,0,0),
                             discardDisplay: "hide",
                             keepDisplay: "hide"
                           };
                         },
  getCardPositionStyle:  function(xPos, yPos, rotation, scale) {
                           if(!scale) scale = 1
                           return 'translate3d(' + xPos +'px,' + yPos + 'px, 0) scale3d(' + scale + ',' + scale + ',1) rotate(' + rotation + 'deg)'
                         },
  render: function() {
            return (
                <div>
                <ul className="card">
                {this.state.cards.map(function(card, i) {
                  return <li key={i} className={card==this.state.activeCard ? "active" : ""} style={card==this.state.activeCard ? {"-webkit-transform": this.state.activeCardTransform} : {"-webkit-transform": this.getCardPositionStyle(0,0,0)}}>
                  <h2 style={{color: card.background}}>{card.name}</h2>
                  <div className={card==this.state.activeCard ? this.state.keepDisplay + " keep action" : "hide keep action"}></div>
                  <div className={card==this.state.activeCard ? this.state.discardDisplay + " discard action" : "hide discard action"}></div>
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

