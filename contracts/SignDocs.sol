// SPDX-License-Identifier: GPL-3

pragma solidity >= 0.8.0;

contract SignedDocs {

	// private by default
	enum DocumentLocation {
		PRIVATE,
		IPFS,
		ARWEAVE
	}
	
	struct Signature {
		bool signed;
		uint timestamp;
		bytes data;
		DocumentLocation documentLocation;
	}
	
	mapping (address signer => mapping(bytes32 documentHash => Signature)) public signatures;
	
	function saveSignature(
		bytes32 _documentSha256,
		bytes calldata _data,
		DocumentLocation _documentLocation
	) internal {
		signatures[msg.sender][_documentSha256] = Signature({
			signed: true,
			timestamp: block.timestamp,
			data: _data,
			documentLocation: _documentLocation
		});
	}
	
	function saveSignatureOfPrivateDoc(bytes32 _documentSha256, bytes calldata _data) external {
		saveSignature(_documentSha256, _data, DocumentLocation.PRIVATE);
	}
	
	function saveSignatureOfIpfsDoc(bytes32 _documentSha256, bytes calldata _data) external {
		saveSignature(_documentSha256, _data, DocumentLocation.IPFS);
	}
	
	function saveSignatureOfArweaveDoc(bytes32 _documentSha256, bytes calldata _data) external {
		saveSignature(_documentSha256, _data, DocumentLocation.ARWEAVE);
	}
}
