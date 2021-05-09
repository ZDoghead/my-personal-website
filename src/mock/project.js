import Mock from 'mockjs';

Mock.mock('/api/project', 'get', {
  code: 0,
	msg: "",
	"data|10": [
    {
      id: "@guid",
      name: "@ctitle",
      "url|1": ["@url", null],
      "github|1": ["@url", null],
      "description|1-4": ["@cparagraph(1, 8)"],
      "thumb": "@image('250x200', @color, '#FFF', 'png', @title)",
      order: 1
    },
  ]
})