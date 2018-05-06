(function () {
    alert('test file woking');
    try {
        $('.select2').select2()
    } catch (e) {
        alert(e.message);
    }
})();