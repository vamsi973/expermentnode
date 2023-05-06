module.exports = {
    sendResponse: (res, statusCode, success, data, message) => {
        res.status(statusCode).json({
            status: statusCode,
            success: success,
            message: message,
            data: data
        });
    }
}