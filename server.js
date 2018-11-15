const { ApolloServer } = require('apollo-server');

const students = [
    {id: 1, name: "Ludwring", lastname: "Liccien", email: "lidwring.liccien@gmail.com"},
    {id: 2, name: "Ludwring", lastname: "Liccien", email: "lidwring.liccien@gmail.com"},
    {id: 3, name: "Ludwring", lastname: "Liccien", email: "lidwring.liccien@gmail.com"},
    {id: 4, name: "Ludwring", lastname: "Liccien", email: "lidwring.liccien@gmail.com"},
    {id: 5, name: "Ludwring", lastname: "Liccien", email: "lidwring.liccien@gmail.com"}
];

const courses = [
    {name: "curso 1", price: 67.9, students: [1,3]},
    {name: "curso 2", price: 67.9, students: [2,4]},
    {name: "curso 3", price: 67.9, students: [1,5]},
    {name: "curso 4", price: 67.9, students: [2,3]},
    {name: "curso 5", price: 67.9, students: [4,5]},
];

const typeDefs = `
    type Student {
        name: String,
        lastname: String,
        fullname: String,
        email: String,
        courses: [Course]

    }

    type Course {
        name: String,
        price: Float
    }
    
    type Message {
        message: String
    }

    type Query {
        student: [Student],
        course: [Course],
        hello(name: String!): Message
    }
`; 


const resolvers = {
    Query: {
        student(root, args, context) {
            return students;
        },
        course(root, args, context) {
            return courses;
        }, 
        hello(root, args, context) {
            return { message: `Hello ${args.name}`};
        }
    },
    Student: {
        fullname(root, args, context) {
            return `${root.name}, ${root.lastname}`;
        },

        courses(root, args, context) {
            return results = courses.filter(data => data.students.includes(root.id));
        }
     }
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => console.log(`server runing in ${url}`));