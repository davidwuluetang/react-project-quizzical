import React from 'react'
import Confetti from 'react-confetti'

export default function ConfettiEffect({numOfQues}) {
  const question_ele = document.querySelector('.question')
  var width = window.innerWidth, height = window.innerHeight

  if (question_ele !== null) {
    height = question_ele.offsetHeight
    height += 100
    height *= numOfQues
    height += 50
  }

  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}