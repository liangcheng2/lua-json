const { clone, mapKeys } = require('lodash')
const { equal, deepEqual } = require('assert')

const { format, parse } = require('.')

const json = {
  _null: null,
  _false: false,
  _true: true,
  _zero: 0,
  _one: 1,
  _negative: -1,
  _float: 3.14,
  _big: 1e123,
  _string: "...'...'...",
  _array0: [],
  _array1: [1],
  _array2: [1, 2],
  _object0: [],
  _object1: {
    _nested: {
      _value: 1,
    },
  },
  _object2: {
    'a b': 1,
    "...'...'...": 2,
    null: 3,
    false: 4,
    true: 5,
  },
  _keywords: {
    do: 'keyword',
    if: 'keyword',
    in: 'keyword',
    or: 'keyword',
    and: 'keyword',
    end: 'keyword',
    for: 'keyword',
    not: 'keyword',
    else: 'keyword',
    then: 'keyword',
    goto: 'keyword',
    break: 'keyword',
    local: 'keyword',
    until: 'keyword',
    while: 'keyword',
    elseif: 'keyword',
    repeat: 'keyword',
    return: 'keyword',
    function: 'keyword'
  }
}

const lua = `return {
  _null = nil,
  _false = false,
  _true = true,
  _zero = 0,
  _one = 1,
  _negative = -1,
  _float = 3.14,
  _big = 1e+123,
  _string = '...\\'...\\'...',
  _array0 = {},
  _array1 = {
    1,
  },
  _array2 = {
    1,
    2,
  },
  _object0 = {},
  _object1 = {
    _nested = {
      _value = 1,
    },
  },
  _object2 = {
    ['a b'] = 1,
    ['...\\'...\\'...'] = 2,
    [nil] = 3,
    [false] = 4,
    [true] = 5,
  },
  _keywords = {
    ['do'] = 'keyword',
    ['if'] = 'keyword',
    ['in'] = 'keyword',
    ['or'] = 'keyword',
    ['and'] = 'keyword',
    ['end'] = 'keyword',
    ['for'] = 'keyword',
    ['not'] = 'keyword',
    ['else'] = 'keyword',
    ['then'] = 'keyword',
    ['goto'] = 'keyword',
    ['break'] = 'keyword',
    ['local'] = 'keyword',
    ['until'] = 'keyword',
    ['while'] = 'keyword',
    ['elseif'] = 'keyword',
    ['repeat'] = 'keyword',
    ['return'] = 'keyword',
    ['function'] = 'keyword',
  },
}`

const luaMinified = `return{_null=nil,_false=false,_true=true,_zero=0,_one=1,_negative=-1,_float=3.14,_big=1e+123,_string='...\\'...\\'...',_array0={},_array1={1,},_array2={1,2,},_object0={},_object1={_nested={_value=1,},},_object2={['a b']=1,['...\\'...\\'...']=2,[nil]=3,[false]=4,[true]=5,},_keywords={['do']='keyword',['if']='keyword',['in']='keyword',['or']='keyword',['and']='keyword',['end']='keyword',['for']='keyword',['not']='keyword',['else']='keyword',['then']='keyword',['goto']='keyword',['break']='keyword',['local']='keyword',['until']='keyword',['while']='keyword',['elseif']='keyword',['repeat']='keyword',['return']='keyword',['function']='keyword',},}`

equal(format(json), lua)
deepEqual(parse(lua), json)
equal(format(json, { spaces: null }), luaMinified)
deepEqual(parse(luaMinified), json)

const jsonDoubleQuote = clone(json)
jsonDoubleQuote._string = jsonDoubleQuote._string.replace(/'/g, '"')
jsonDoubleQuote._object2 = mapKeys(jsonDoubleQuote._object2, (_, key) => key.replace(/'/g, '"'))
const luaDoubleQuote = lua.replace(/'/g, '"')
equal(format(jsonDoubleQuote, { singleQuote: false }), luaDoubleQuote)
deepEqual(parse(luaDoubleQuote), jsonDoubleQuote)
