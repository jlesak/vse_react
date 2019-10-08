import React, { useState, useEffect } from 'react';

import { Heading, MainSection, Button, Label, Link } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { formatDate } from '../utils/date';
import classNames from 'classnames';
import { getMockQuacks, getMockUser } from '../utils/mocks.js';
import { Quack } from '../molecules/';

export function ExampleOnePage() {
  const [allQuacks, setQuacks] = useState(getMockQuacks());
  const [quackText, setText] = useState('');
  const deleteQuack = id => {
    setQuacks(allQuacks.filter(q => q.id !== id));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let maxId = 0;
    allQuacks.map(function(q) {
      if (q.id > maxId) maxId = q.id;
    });
    var quack = {
      createdAt: new Date(),
      text: quackText,
      user: {
        id: maxId,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
    };
    setQuacks([...allQuacks, quack]);
  };

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example One!</Heading>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <textarea
              rows="2"
              cols="50"
              onChange={e => setText(e.target.value)}
            >
              {quackText}
            </textarea>
            {/*<input type="text" value={quackText} onChange={e => setText(e.target.value)}/>*/}
          </label>
          <input type="submit" value="Submit" />
        </form>
        {allQuacks.map(quack => (
          <SimpleQuack quack={quack} onDelete={deleteQuack} key={quack.id} />
        ))}
      </MainSection>
    </div>
  );
}

function SimpleQuack({ quack, onDelete }) {
  const { user, text, createdAt } = quack;
  //je to to samy jako
  // const text = quack.text;
  // const createdAt = quack.createdAt;
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log('cus', counter);
  }, [counter]);

  useEffect(() => {
    console.log('dobry den');
  }, []);

  return (
    <div className="bb b--black-10 pb2 mt2">
      {user && <h4 className="mv1">{user.screenName}</h4>}
      <h5 className="mv1">{createdAt ? formatDate(createdAt) : '(no date)'}</h5>
      <div>{text || '(no text)'}</div>
      <button
        type="button"
        className={classNames({
          blackVariant: counter < 5,
          orangeVariant: counter > 4 && counter < 10,
          redVariant: counter > 9,
        })}
        onClick={() => setCounter(counter + 1)}
      >
        Likes: {counter}
      </button>
      <button type="button" onClick={() => onDelete(quack.id)}>
        Delete
      </button>
    </div>
  );
}
