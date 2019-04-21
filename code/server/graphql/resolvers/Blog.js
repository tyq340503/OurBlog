function postedBy(parent, args, context) {
    return context.prisma.blog({ id: parent.id }).postedBy();
}

module.exports = {
    postedBy
}