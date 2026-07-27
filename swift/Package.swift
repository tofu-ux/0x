// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Ox",
    platforms: [
        .iOS(.v15),
        .macOS(.v11),
        .tvOS(.v15),
        .watchOS(.v8),
        .visionOS(.v1)
    ],
    products: [
        .library(name: "Ox", targets: ["Ox"])
    ],
    targets: [
        .target(
            name: "Ox",
            swiftSettings: [
                .enableExperimentalFeature("StrictConcurrency")
            ]
        )
    ]
)
