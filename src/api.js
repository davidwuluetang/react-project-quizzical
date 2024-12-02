import {decode} from 'html-entities';
import { shuffle } from './utils';

export function fetchQuestions(queryString) {
  
    return new Promise((resolve, reject) => {
            fetch(`https://opentdb.com/api.php?${queryString}&type=multiple`)
            .then(res => {
                if(!res.ok)
                    reject(res)
                else 
                   return res.json();
            }).then(data => {
                const resultSet = []
      
                data.results.forEach((res, index) => {
                  let answersArr = []
                  res.incorrect_answers.forEach(ans => answersArr.push(decode(ans, {level: 'html5'})))
                  answersArr.push(decode(res.correct_answer, {level: 'html5'}))
      
                  let tempSet = {
                    question_id: `question_${index + 1}`,
                    question: decode(res.question, {level: 'html5'}),
                    correct_answer: decode(res.correct_answer, {level: 'html5'}),
                    shuffled_answers: shuffle(answersArr)
                  }
      
                  resultSet.push(tempSet)
                })

                resolve(resultSet)
            }).catch(err => reject(err))
    })

}