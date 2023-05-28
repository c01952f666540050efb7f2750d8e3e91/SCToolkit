use reqwest::header::CONTENT_TYPE;
use reqwest::Client;
use serde_json::json;
use std::error::Error;
use dotenv::dotenv;
use std::env;


#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    dotenv().ok();

    let client = Client::new();

    let request_url = env::var("QUICKNODE_HTTP")?;  // load the Ethereum node URL from the environment

    let payload = json!({
        "method": "parity_pendingTransactions",
        "params": [],
        "id": 1,
        "jsonrpc": "2.0"
    });

    let response = client
        .post(&request_url)
        .header(CONTENT_TYPE, "application/json")
        .json(&payload)
        .send()
        .await?;

    let response_text = response.text().await?;
    
    println!("{}", response_text);

    Ok(())
}