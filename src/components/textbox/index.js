import React, { useState } from 'react';
import './index.css';

const Textbox = (props) => {
    const { onClick } = props;

    const [text, setText] = useState('');

    const lineCount = () => {
        const lines = text.split(/\r*\n/).filter(x => x !== '');

        return lines.length;
    };

    const onButtonClick = () => {
        const lines = text.split(/\r*\n/).filter(x => x !== '');

        onClick(lines.join('\n'));
    }

    return (
        <div>
            <textarea 
                value={text} 
                onChange={e => setText(e.target.value)} 
                rows={10} 
                placeholder={"Add your own items here... (seperate with lines)"} 
            />

            <button className="start-button" disabled={lineCount() < 2} onClick={() => onButtonClick()}>
                Start ranking
            </button>
        </div>
    );
};

export default Textbox;