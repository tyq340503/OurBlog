function info(parent, args, context, info) {
    return "Just Testing info...";
}

function feedBlogs(parent, args, context, info) {
    return context.prisma.blogs();
}

module.exports = {
    info,
    feedBlogs
}