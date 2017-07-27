var fs = require('fs');
var ejs = require('ejs');
let articleClass = () => {
    return {
        // 文章标题
        a_title: "",
        // 作者
        a_author: "",
        // 标记 or 笔记 mark comment 当a_type为comment的时候其a_comment为空
        a_type: 'mark',

        // 位置 标记的位置为两段，而笔记的位置为一段
        a_p_start: 0,
        a_p_end: 0,
        // 添加时间 可设置为不显示
        a_time: "",
        // 内容
        a_content: ""
    }
}

let fileName = 'My Clippings.txt'
fs.readFile(fileName,
    'utf-8',
    (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let str = data;
            //文章json数据列表
            let article_jsons = [];
            //文章列表
            let articles = str.split('\r\n==========\r\n');
            //每个文章内部处理得到数据结构json
            if (articles.length > 0) {
                articles.forEach((item, index) => {
                    let article_obj = articleClass();

                    if (item.length <= 0) {
                        return;
                    } else {
                        var __temp__ = item.split('\r\n\r\n');
                        article_obj.a_content = __temp__[1];

                        // 位置和时间
                        let no_time = __temp__[0].split('\r\n')[1];
                        // 标题和作者
                        let title_author = __temp__[0].split('\r\n')[0];

                        article_obj.a_title = title_author.substring(
                            0,
                            title_author.lastIndexOf('(')
                        )
                        article_obj.a_author = title_author.substring(
                            title_author.lastIndexOf('(') + 1,
                            title_author.lastIndexOf(')')
                        )
                        if (/笔记/.test(no_time)) {
                            article_obj.a_type = 'comment';
                            article_obj.a_p_end = article_obj.a_p_start = no_time.substring(
                                no_time.lastIndexOf('#') + 1,
                                no_time.lastIndexOf('的笔记'))
                        } else {
                            article_obj.a_type = 'mark';
                            article_obj.a_p_start = no_time.substring(
                                no_time.lastIndexOf('#') + 1,
                                no_time.lastIndexOf('-')
                            )
                            article_obj.a_p_end = no_time.substring(
                                no_time.lastIndexOf('-') + 1,
                                no_time.lastIndexOf('的标注')
                            )
                        }
                        article_obj.a_time = no_time.substring(
                            no_time.lastIndexOf('添加于 ') + 1
                        )
                        article_jsons.push(article_obj);
                    }


                });
            }
            //开始装载EJS模板保存文件 
            ejs.renderFile('index.ejs', {
                user: {
                    name: 'luopei'
                }
            }, (err, str) => {
                console.log(str)
            });

        }
    })