const users = [
    {
        name: 'User',
        email: 'user@example.ep',
        address: 'enter your address',
        phone: '010-1234-5678'
    }
];

const paragraphs = [
    {
        title: "Example",
        content: "Example 1^|^Example 2^|^Example 3"
    }
];

const portfolios = [
    {
        title: "portfolio Example",
        paragraphs: [
            {
                intro: "ex1^|^ex2",
                content: "Example 1^|^Example 2^|^Example 3"
            },
            {
                intro: "aex1^|^aex2",
                content: "anotherExample 1^|^anotherExample 2^|^anotherExample 3"
            }
        ]
    }
];

module.exports = {
    users,
    paragraphs,
    portfolios
};