function blogs(parent, args, context) {
    return context.prisma.user({ id: parent.id }).blogs();
}

module.exports = {
    blogs
}