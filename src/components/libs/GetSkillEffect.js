export default {
  data() {
    return {
      a: {
        self: '自分',
        all: '全色',
        vo: 'Vo属性',
        da: 'Da属性',
        vi: 'Vi属性'
      },
      b: {
        all: '両面',
        ap: 'AP',
        dp: 'DP'
      },
      c: {
        '1': '（小）',
        '2': '（中）',
        '3': '（大）',
        '4': '（特大）',
        '5': '（極大）'
      },
      d: {
        buff: 'アップ',
        debuff: 'ダウン'
      },
      e: '(他Pフェス)'
    }
  },
  methods: {
    $_getSkillEffect(data) {
      let effect = this.a[data.a] + this.b[data.b] + this.c[data.c] + this.d[data.d]
      data.e && (effect += this.e)
      return effect
    }
  }
}