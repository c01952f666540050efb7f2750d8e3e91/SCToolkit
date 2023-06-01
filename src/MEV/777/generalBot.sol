pragma solidity ^0.8.19;

import "aave-v3-core/contracts/interfaces/IPool.sol";
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

contract generalBot {
    address constant weth_address = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address constant uniswap_router = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address constant sushiswap_router = 0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F;

    address private owner;
    IUniswapV2Router private uniswap;
    ISushiSwapRouter private sushiswap; 
    IPool private aavePool;
    
    constructor() {
        owner = msg.sender;
        uniswap = IUniswapV2Router(uniswap_router);
        sushiswap = ISushiSwapRouter(sushiswap_router);
        aavePool = IPool(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);
    }

    function test(address user) public {
        // return 1
    }

    function testv0(address _tokenAddress, uint256 _amount) external  {
        // address asset = _tokenAddress;
        // uint256 amount = _amount;
        // address onBehalfOf = address(this);    
        
        // aavePool.supply(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2, amount, address(this), 0);
    }
}
