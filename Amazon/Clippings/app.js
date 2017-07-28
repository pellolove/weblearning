var fs = require('fs');
var ejs = require('ejs');
//https://www.npmjs.com/package/lowdb
const low = require('lowdb');
const _ = require('lodash');
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
let bookList = [];
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
                            no_time.lastIndexOf('添加于 ')
                        )

                        if (_.filter(bookList, (item) => {
                                return item.a_title == article_obj.a_title;
                            }).length === 0) {
                            bookList.push(article_obj)
                        }

                        article_jsons.push(article_obj);
                    }


                });
            }
            //数据处理，添加进数据库使用lowdb


            // //开始装载EJS模板保存文件 
            ejs.renderFile('index.ejs', {
                bookList: bookList,
                markList: article_jsons,

            }, (err, str) => {
                console.log(err, str);
                fs.writeFile('index.html', str);
            });
            // const db = low('db.json');
            // const dbBook = low('books');
            // // dbBook.setState({});
            // dbBook.defaults({
            //     post: article_jsons
            // }).write();
            // db.defaults({
            //         posts: [],
            //         user: {}
            //     })
            //     .write();
            // db.get('posts')
            //     .push({
            //         id: 1,
            //         title: 'lowdb'
            //     })
            //     .write();
            // db.set('user.name', 'luopei')
            //     .write();

            // db._.mixin({
            //     second: function (arr) {
            //         return arr[1];
            //     }
            // });
            // console.log(db.get('posts').second().value());
            // db.read('books').then(console.log);

            // if (!db.has('posts').value()) {
            //     db.set("posts", [])
            //         .write();
            // }

            // let res = dbBook.get('0')
            // .rem

            // console.log(res);

            // let id = dbBook.get('post')
            //     /* //移除作者为 赵周的post
            //     .remove({"a_author": "赵周"})  */
            //     .push({
            //         "a_title": "6666",
            //         "a_author": "Yuval Noah Harari",
            //         "a_type": "mark",
            //         "a_p_start": "5473",
            //         "a_p_end": "5475",
            //         "a_time": "加于 2017年7月24日星期一 上午7:34:27",
            //         "a_content": "些人，不管得到了多大的恩赐，还是一直郁郁寡欢？我们常认为，只要换个工作、找到老公、买了新车、写完小说，或是付完房贷，做完诸如此类的事，就能让自己快乐得不得了"
            //     })
            //     .write();
            // console.log(id)
        }
    })