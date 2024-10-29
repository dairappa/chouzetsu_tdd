use assert_cmd::Command;

#[test]
fn works() {
    assert!(true);
}

#[test]
fn runs() {
    let mut command = Command::cargo_bin("hello").unwrap();
    command.assert().success().stdout("Hello, world!\n");
}

#[test]
fn true_ok() {
    let mut command = Command::cargo_bin("true").unwrap();
    command.assert().success();
}

#[test]
fn false_not_ok() {
    let mut command = Command::cargo_bin("false").unwrap();
    command.assert().failure();
}
