function info(parent, args, context, info) {
    return "Just Testing info...";
}

function allBlogs(parent, args, context, info) {
    return context.prisma.blogs();
}

function allUsers(parent, args, context, info) {
    return context.prisma.users();
}

function allComments(parent, args, context, info) {
    return context.prisma.comments();
}

module.exports = {
    info,
    allBlogs,
    allUsers,
    allComments
}