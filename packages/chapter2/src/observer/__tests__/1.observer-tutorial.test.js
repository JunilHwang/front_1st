import { expect, vi, test, describe } from 'vitest'

import { 구독자, 발행기관 } from "../observer-tutorial.js";

describe('구독/발행 테스트', () => {
  const 상태_발행기관 = new 발행기관({ a: 10, b: 20 });
  const 덧셈계산기 = vi.fn(() => (`a + b = ${상태_발행기관.a + 상태_발행기관.b}`));
  const 곱셈계산기 = vi.fn(() => (`a * b = ${상태_발행기관.a * 상태_발행기관.b}`));

  const 덧셈계산기_구독자 = new 구독자(덧셈계산기);
  const 곱셈계산기_구독자 = new 구독자(곱셈계산기);

  덧셈계산기_구독자.구독(상태_발행기관);
  곱셈계산기_구독자.구독(상태_발행기관);

  test('발행기관이 구독자에게 알릴 수 있다.', () => {
    상태_발행기관.구독자에게_알림();
    expect(덧셈계산기).toHaveReturnedWith(`a + b = 30`)
    expect(곱셈계산기).toHaveReturnedWith(`a * b = 200`)
  })

  test('발행기관에 변화가 생기면 구독자가 알림을 받는다.', () => {
    상태_발행기관.내부에_변화가_생김({ a: 100, b: 200 });
    expect(덧셈계산기).toHaveReturnedWith(`a + b = 300`);
    expect(곱셈계산기).toHaveReturnedWith(`a * b = 20000`);
  })
})
