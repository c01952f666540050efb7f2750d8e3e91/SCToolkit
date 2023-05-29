pragma solidity ^0.8.19;

// Interfaces for Uniswap and other DeFi platforms (for example, Sushiswap) are needed. Below is the Uniswap example.
interface IUniswapV2Router {
    function swapExactTokensForETH(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts);
    function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts);
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut,address[] calldata path,address to,uint deadline) external payable returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin,address[] calldata path,address to,uint deadline) external payable returns (uint[] memory amounts);
}

interface ISushiSwapRouter {
    function swapExactETHForTokens(uint amountOutMin,address[] calldata path,address to,uint deadline) external payable returns (uint[] memory amounts);
    function getAmountsOut(uint amountIn, address[] memory path) external view returns (uint[] memory amounts);
    function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline) external returns (uint[] memory amounts);
    function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts);
}
interface IWETH9 {
    function deposit() external payable;
    function withdraw(uint256 wad) external;
    function approve(address guy, uint256 wad) external returns (bool);
    function transfer(address dst, uint256 wad) external returns (bool);
    function transferFrom(address src, address dst, uint256 wad) external returns (bool);
    function totalSupply() external view returns (uint256);
    function balanceOf(address src) external view returns (uint256);
    function allowance(address src, address guy) external view returns (uint256);

    event Approval(address indexed src, address indexed guy, uint256 wad);
    event Transfer(address indexed src, address indexed dst, uint256 wad);
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract MEVArbitrage {
  address constant weth_address = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
  address constant uniswap_router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  address constant sushiswap_router = 0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F;

  address private owner;
  IUniswapV2Router private uniswap;
  ISushiSwapRouter private sushiswap; 
  
    constructor(address _uniswap, address _sushiswap) {
        owner = msg.sender;
        uniswap = IUniswapV2Router(_uniswap);
        sushiswap = IUniswapV2Router(_sushiswap);

    }

    function deposit(uint _amount) public {
    
  }

    function executeArbitrage(uint amountIn) external {
        
    }

    function arbitrage(address _address, uint _amountIn) external {
        // IWETH9(WETH_ADDRESS).transferFrom(msg.sender, address(this), _amountIn);
        // IWETH9(WETH_ADDRESS).approve(address(UNISWAP_ROUTER_ADDRESS) ,_amountIn); 
        // // Buy the token on Uniswap with ETH
        // address[] memory path = new address[](2);
        // path[0] = WETH_ADDRESS;
        // path[1] = _address;
        // // Get the amount of tokens received
        // uint256[] memory amounts = uniswapRouter.swapExactTokensForTokens(_amountIn, 0, path, address(this), block.timestamp);
        // uint256 amountOut = amounts[1];
        // // Sell the token on Sushiswap with _address
        // IWETH9(_address).approve(address(SUSHISWAP_ROUTER_ADDRESS) ,amountOut); 
        // path[0] = _address;
        // path[1] = WETH_ADDRESS;
        // uint256[] memory amounts_1 = sushiswapRouter.swapExactTokensForTokens(amountOut,0, path, msg.sender, block.timestamp);
        // uint256 amountOut_1 = amounts_1[1];
        // require(amountOut_1 > _amountIn , "Arbitrage fail !");
    }


}
