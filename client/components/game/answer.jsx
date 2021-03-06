import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { startGame, createCards } from '../../actions/game';

import Board from './board';

import './game.scss';

class Answer extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    // for DEV
    // const imageWin = require('../../../dev/cat-dj.jpg');

    // for PROD... need to use env vars
    const imageWin = require('../../../server/assets/cat-dj.jpg');

    return (
      <div id='answer-view'>
      {(this.props.gameboard.data.gameCompleted
        ? <div id='winner-view'>
            <div className='content'>
              YOU HAZ ALL THE CATS IN <span id='score'>{this.getTimeSpan(this.props.gameboard.data.elapsed)}</span> TIME.  PAWSOMEEEEE !!
              <div className='start-game'>
                <div className='content'>
                  <div>
                    Click to start a new game!
                  </div>
                  <button
                    className='btn btn-sm'
                    onClick={() => this.startGame()}
                    >START
                  </button>
                </div>
              </div>
              <img src={imageWin} alt=""/>
            </div>
            
          </div>
        : <div>
            {(this.props.gameboard.UI.showBoard
            ? <div>
                <div id='board-container'>
                  <Board />
                </div>
              </div>
            : <div className='start-game'>
                <div className='content'>
                  <div>
                    Click to start a new game!
                  </div>
                  <button
                    className='btn btn-sm'
                    onClick={() => this.startGame()}
                    >START
                  </button>
                </div>
              </div>
            )}
          </div>
      )}
      </div>
    );
  }

  startGame() {
    this.props.startGame();
    this.props.createCards();
  }
  
  getTimeSpan (elapsed) {
    var m = String(Math.floor(elapsed/1000/60)+100).substring(1);
    var s = String(Math.floor((elapsed%(1000*60))/1000)+100).substring(1);
    var ms = String(elapsed % 1000 + 1000).substring(1,3);
    return m+":"+s+"."+ms;
  }
  
}

export default connect(
  (state) => ({ gameboard: state.gameboard }),
  { startGame, createCards }
)(Answer);
