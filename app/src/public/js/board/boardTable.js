"user strict";

const { options } = require("../../../routes/board");

const writer = document.querySelector("#writer"),
        seq = document.querySelector("#seq"),
        title = document.querySelector("#title"),
        date = document.querySelector("#date"),
        views = document.querySelector("#views");




const onSubmit = (e) => {
    e.preventDefault();
    const {page} = sq.parse(location.search, {
        ingnoreQueryprefix: true,
    });
    dispatch(searchPost({page: page, option: options, content: value}));
    setvalue('');
};