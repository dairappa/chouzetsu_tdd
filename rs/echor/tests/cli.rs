use assert_cmd::Command;
use predicates::prelude::*;
use std::fs;

// C#などだとBoxingは値型をポインタ参照で渡すこと（参照渡しとすること）、Unboxingはポインタ参照を元の値型に戻すこと
// RustにもHeap領域とStack領域があり、Stack領域にはメモリ領域が固定されたもの = 値型 or 参照ポインタ が入ることになる。
// dyn は文字通り動的に解決されること（この場合はError traitを実装したものに動的に解決される）を意味する。
type TestResult = Result<(), Box<dyn std::error::Error>>;

#[test]
fn dies_no_args() -> TestResult {
    Command::cargo_bin("echor")?
        .assert()
        .failure()
        .stderr(predicate::str::contains("USAGE"));
    Ok(())
}

#[test]
fn runs() -> TestResult {
    Command::cargo_bin("echor")?.arg("hello").assert().success();
    Ok(())
}

fn run(args: &[&str], expected_file: &str) -> TestResult {
    let expected = fs::read_to_string(expected_file)?;
    Command::cargo_bin("echor")?
        .args(args)
        .assert()
        .success()
        .stdout(expected);
    Ok(())
}

#[test]
fn hello1() -> TestResult{
    run(&["Hello there"], "tests/expected/hello1.txt")
}

#[test]
fn hello2() -> TestResult{
    run(&["Hello", "there"], "tests/expected/hello2.txt")
}

#[test]
fn hello1_no_newline() -> TestResult {
    run(&["Hello  there", "-n"], "tests/expected/hello1.n.txt")
}

#[test]
fn hello2_no_newline() -> TestResult {
    run(&["-n", "Hello", "there"], "tests/expected/hello2.n.txt")
}