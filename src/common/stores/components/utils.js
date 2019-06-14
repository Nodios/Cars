function mapColumns(columns) {
    return columns.map(col => {
        return {
            ...col,
            orderKey: col.orderKey || col.key
        }
    });
}

export {
    mapColumns
};