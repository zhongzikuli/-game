import React from 'react';
import Square from './Square';

function calculateWinner(squares) {
    const lines = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }


    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            alert('游戏结束！');
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]}
                       onClick={() => this.handleClick(i)}/>;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        const boardRow = this.state.squares.map((item,index) =>
            <span key={index}>{this.renderSquare(index + 1)}</span>
        );

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {boardRow}
                </div>
            </div>
        );
    }
}

export default Board